import { Request, Response } from "express";
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from "../views/orphanages_view";
import * as Yup from 'yup';


export default {
    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            description,
            instructions,
            open_hours,
            open_on_weekends
        } = req.body;
    
        const repository = getRepository(Orphanage);

        const reqImages = req.files as Express.Multer.File[];
        const images = reqImages.map(image => {
            return {
                path: image.filename
            }
        });
        const data = {
            name,
            latitude,
            longitude,
            description,
            instructions,
            open_hours,
            open_on_weekends,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            description: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            open_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        await schema.validate(data, {
            abortEarly: false
        });
        data.open_on_weekends = (open_on_weekends === 'true');
    
        const orphanage = repository.create(data);
    
        await repository.save(orphanage);

        return res.status(201).json({ msg: 'Orphanage created successfuly!' });
    },

    async index(req: Request, res: Response) {
        const repository = getRepository(Orphanage);

        const orphanages = await repository.find({
            relations: ['images']
        });

        return res.status(200).json({ orphanages: orphanageView.renderArray(orphanages) });
    },

    async findById(req: Request, res: Response) {

        const repository = getRepository(Orphanage);
        const { id } = req.params;

        const orphanage = await repository.findOneOrFail(id, {
            relations: ['images']
        });

        return res.status(200).json({ orphanage: orphanageView.render(orphanage) });
    }
}