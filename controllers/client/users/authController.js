const bcrypt = require('bcryptjs')
const appRoot = require('app-root-path')
const { somethingError } = require(appRoot+'/helpers/error_response')

// Utils
const { generateJwtToken } = require(appRoot+'/utils/jwtAccessToken')

// Validation
const validateRegisterInput = require(appRoot+'/validations/client/auth/register')
const validateLoginInput = require(appRoot+'/validations/client/auth/login')

// Models
const User = require(appRoot+'/models/client/user')

// Register user
exports.postRegister = (req, res) => {
	// Validate user register input
	const errors = validateRegisterInput(req.body)
	if(errors) return res.status(400).json(errors)

	// Check user already exist or not
	User.findOne({company_email: req.body.email})
		.then(user=>{
			if(user){
				// Return user message
				return res.status(409).json({
					success : false,
					error : "User already exist"
				})
			}else{
				// Create new user
				// Get user data form request
				const user = new User({
					company_email: req.body.email,
					company_password: req.body.password
				})

				// Generate password
				bcrypt.genSalt(10, (err, salt)=>{
					if(err) throw err
					bcrypt.hash(user.company_password, salt, (err, hash)=>{
						if(err) throw err
						// Replace user password by hash
						user.company_password = hash
						user.save()
						.then(user=>{
							res.status(201).json({
								success: true,
								user: {
									email: user.company_email,
									status: user.status
								}
							})
						})
						.catch(err=>somethingError(res, err))
					})
				})

			}
		})
		.catch(err=> somethingError(res, err))
}

// Login user
exports.postLogin = (req, res) => {
	// Validate user login input
	const errors = validateLoginInput(req.body)
	if(errors) return res.status(400).json(errors)

	const email = req.body.email;
  const password = req.body.password;

  // Check user email
  User.findOne({ company_email: email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ success: false, email: "Email or password incorrect!" });
      } else {
      	bcrypt.compare(password, user.company_password)
          .then(isMatch => {
            if (isMatch) {
              // Payload
              const payload = {
                id: user._id,
                email: user.company_email,
                subscription: user.subscription,
                status: user.status
              };
              // Generate jwt access token
              generateJwtToken(payload, (token) => {
                if (token) {
                  return res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                    user: payload
                  });
                } else {
                  throw new Error();
                }
              });
            } else {
            	throw new Error();
            }
          })
          .catch(err => res.status(404).json({ success: false, email: "Email or password incorrect!" }))
      }
    })
    .catch(err => res.status(404).json({ success: false, email: "Email or password incorrect!" }));
}

