const appRoot = require('app-root-path')
const { somethingError } = require(appRoot+'/helpers/error_response')

// Validation
const validateCompanySettingsInput = require(appRoot+'/validations/client/users/companySettings')

// Models
const User = require(appRoot+'/models/client/user')

// Upload image
const { deleteServerImage } = require(appRoot+'/utils/cloudinary');

// Update company settings
exports.putCompanySettings = (req, res) => {
	// Validate company settings input
	const errors = validateCompanySettingsInput(req.body)
	if(errors) return res.status(400).json(errors)

	// Find user/company for update data
User.findById(req.user._id)
.then(user=>{
			// Extract body data
			const {
				company_name,
				company_reg_no,
				vat_no,
				default_vat,
				address,
				post_code,
				city,
				web,
				ctp_first_name,
				ctp_last_name,
				ctp_email,
				ctp_phone,
				ctp_phone2
			} = req.body

			// Update data
			user.company_name = company_name
			user.company_reg_no = company_reg_no
			user.vat_no = vat_no
			user.default_vat = default_vat ? default_vat : 0
			user.address = address
			user.post_code = post_code
			user.city = city
			user.web = web
			user.ctp_first_name = ctp_first_name
			user.ctp_last_name = ctp_last_name
			user.ctp_email = ctp_email
			user.ctp_phone = ctp_phone
			user.ctp_phone2 = ctp_phone2
			user.updated_at = Date.now()

			// Update DB
			user.save()
			.then(user => {
				if(user){
					return res.status(201).json({
						success: true,
						user: user
					})
				}
			})
			.catch(err=>somethingError(res, err))
		})
.catch(err=>somethingError(res, err))
}

// Get company info
exports.getCompanySettings = (req, res) => {
	// Get user settings info
	User.findById(req.user._id)
	.then(user=>{
		if(user){
			res.json({
				success: true,
				user: user
			})
		}
	})
	.catch(err=>somethingError(res, err))
}

// Upload company logo
exports.putUploadLogo = (req, res) => {

	User.findOne({_id: req.user._id})
	.then(user=>{
		if(user){
				// Upload image
				if(req.file){

					// Check if user already has a logo delete it and upload new
					if(user.logo_id){
						// Delete old logo
						const result = deleteServerImage(user.logo_id)
						// Upload new logo
						user.logo_id = req.file.public_id
						user.logo = req.file.url
					}else{
						// Upload new logo
						user.logo_id = req.file.public_id
						user.logo = req.file.url
					}

					// Update user
					user.save()
					.then(user => {
						if(user){
							return res.status(201).json({
								success: true,
								user: user
							})
						}
					})
					.catch(err=>somethingError(res, err))
				}else{
					return res.json({
						success: false,
						message: 'Please select a logo'
					})
				}
			}else{
				noDataFound(res)
			}
		})
	.catch(err=>somethingError(res, err))
}