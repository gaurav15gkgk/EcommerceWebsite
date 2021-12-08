import {parameterValidators, makeInvalidParametersString} from '../../../utils/paramerterValidator'
import {
    emailIdRegex,
    passwordRegex, 
    onlyCharRegex
} from '../../../utils/commonRegex'

export const checkSignupParameters = async (req, res, next ) => {
    const validParameters = [
        {
            parameter: 'name',
            type: 'string',
            expressionType: 'regex',
            validExpression: onlyCharRegex
        },
        {
            parameter: 'email',
            type: '',
            expressionType: 'regex',
            validExpression: emailIdRegex
        },
        {
            parameter: 'username',
            type: 'string',
            expressionType: 'typeof',
            validExpression: ''
        },
        {
            parameter: 'password',
            type: '',
            expressionType: 'regex',
            validExpression: passwordRegex
        }
        

    ]

    const inValidParameters = parameterValidators(validParameters, req.body)
       
    if(inValidParameters.length > 0){
        const inValidParametersString = makeInvalidParametersString(inValidParameters)
        return res.status(400).json({
            "error": `${inValidParametersString}`
        })
    }

    next()


}