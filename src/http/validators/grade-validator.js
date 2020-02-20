import Joi from '@hapi/joi'

export const validateGradeData = (gradeData) => {
    const schema = Joi.object({
        max: Joi.number().required(),
        done: Joi.number().required(),
    })

    return schema.validate(gradeData);
}

