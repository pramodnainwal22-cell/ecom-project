import passwordValidator from "password-validator"
var schema = new passwordValidator();

schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase(1)                              // Must have at least 1 uppercase letters
        .has().lowercase(1)                              // Must have at least 1 lowercase letters
        .has().digits(1)                                // Must have at least 1 digits
        .has().symbols(1)                                // Must have at least 1 Special Character
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password@123', 'User@123', 'Admin@123']); // Blacklist these values
export default function FormValidator(e) {
    let { name, value, files } = e.target

    switch (name) {
        case "name":
        case "username":
        case "icon":
        case "pin":
        case "city":
        case "state":
            if (!value || value.length === 0)
                return name + "Field is Mandatory"
            else if (value.length < 3 || value.length > 100)
                return name + "Field Length Must Be 3-100 Characters"
            else
                return ""
        case "email":
            if (!value || value.length === 0)
                return name + "Field is Mandatory"
            else if (value.length < 13 || value.length > 100)
                return name + "Field Length Must Be 13-100 Characters"
            else
                return ""
        case "phone":
            if (!value || value.length === 0)
                return name + "Field is Mandatory"
            else if (value.length !== 10)
                return name + "Field Length Must Be 10 Digits"
            else if (!(value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9"))) {
                return "Invalid Phone Number"
            }
            else
                return ""
        case "password":
            if (!value || value.length === 0)
                return name + "Field is Mandatory"
            else if (!schema.validate(value))
                return schema.validate(value, { details: true }).map(x=>x.message.replaceAll("string","Password")).join(". ")
            else
                return ""
        case "message":
        case "question":
        case "answer":
        case "address":
            if (!value || value.length === 0)
                return "Name Field is Mandatory"

            else
                return ""

        case "basePrice":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (parseInt(value) < 1)
                return "Base Price Must Be a Value Greater Than 0"
            else
                return ""

        case "discount":
            if (!value || value.length === 0)
                return name + " Field is Mandatory"
            else if (parseInt(value) < 0 || parseInt(value) > 100)
                return " Discount Must Be Within 0-100"
            else
                return ""

        case "stockQuantity":
            if (!value || value.length === 0)
                return name + "Name Field is Mandatory"
            else if (parseInt(value) < 0)
                return "Stock Quantity Must Be a Value Greater Than or Equal to 0"
            else
                return ""


    }
}
