import Orphanage from "../models/Orphanage";
import imagesView from "./images_view";

const orphanageView = {
    render(orphanage: Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            description: orphanage.description,
            instructions: orphanage.instructions,
            open_hours: orphanage.open_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imagesView.renderArray(orphanage.images)
        }
    },
    renderArray(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
}

export default orphanageView;