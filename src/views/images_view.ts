import Image from "../models/Image";

const imagesView = {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://192.168.0.19:3333/uploads/${image.path}`
        }
    },
    renderArray(images: Image[]) {
        return images.map(image => this.render(image));
    }
}

export default imagesView;