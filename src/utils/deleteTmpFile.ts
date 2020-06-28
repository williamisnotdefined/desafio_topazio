import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';

const deleteTmpFile = async (filename: string): Promise<void> => {
    const filePath = path.join(uploadConfig.directory, filename);

    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        await fs.promises.unlink(filePath);
    }
};

export default deleteTmpFile;
