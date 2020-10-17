import Image from "../models/Image";

const imagesView = {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://localhost:3333/uploads/${image.path}`
        }
    },
    renderArray(images: Image[]) {
        return images.map(image => this.render(image));
    }
}

export default imagesView;