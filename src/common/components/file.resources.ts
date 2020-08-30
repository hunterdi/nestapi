import { extname } from "path";
import { BadRequestException } from "@nestjs/common";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const imageFileFilter = (req, file, callback) => {
    console.debug(file);
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    console.debug(file);
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
        callback(null, `${name}-${randomName}-${fileExtName}`);
};