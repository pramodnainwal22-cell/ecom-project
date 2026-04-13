export default function ImageValidator(e) {
    let files = Array.from(e.target.files)

    if (files.length === 1) {
        let pic = files[0]

        if (
            pic.type !== "image/jpg" &&
            pic.type !== "image/jpeg" &&
            pic.type !== "image/png" &&
            pic.type !== "image/gif" &&
            pic.type !== "image/webp"
        )
            return "Invalid Pic Format, Please Upload An Image of Type .jpg, .jpeg, .png, .gif, .webp"

        else if (pic.size > 1048576)
            return "Pic is Too Heavy, Please Upload an Image Upto 1 MB"

        else
            return ""
    }
    else {
        let errorMessage = []

        files.forEach((pic, index) => {
            if (
                pic.type !== "image/jpg" &&
                pic.type !== "image/jpeg" &&
                pic.type !== "image/png" &&
                pic.type !== "image/gif" &&
                pic.type !== "image/webp"
            )
                errorMessage.push(
                    `Invalid Pic ${index + 1} Format, Please Upload An Image of Type .jpg, .jpeg, .png, .gif, .webp`
                )
            else if (pic.size > 1048576)
                errorMessage.push(
                    `Pic ${index + 1} is Too Heavy, Please Upload an Image Upto 1 MB`
                )
        })

        return errorMessage.length ? errorMessage.join(" ") : ""
    }
}
