import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { format } from 'date-fns';
import { readdirSync, statSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join } from "node:path";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  async firmwareList() {
    try {
      const directoryPath = join('uploads', 'firmwares');
      if (!existsSync(directoryPath)) mkdirSync(directoryPath, { recursive: true });
      const filesAndFolders = readdirSync(directoryPath);
      const file = filesAndFolders.filter((item) => item !== ".DS_Store").map((item) => {
        const itemPath = join(directoryPath, item);
        const stats = statSync(itemPath);
        return {
          fileName: item,
          filePath: `/media/firmwares/${item}`,
          fileSize: `${(stats.size * 0.000001).toFixed(2)}MB`,
          createDate: format(stats.birthtime, "yyyy-MM-dd' 'HH:mm:ss")
        };
      });
      return { data: file };
    } catch (err: any) {
      this.logger.error(err.message);
      return { error: err.message };
    }
  }

  userList() {
    try {
      const directoryPath = join('uploads', 'image', 'users');
      if (!existsSync(directoryPath)) mkdirSync(directoryPath, { recursive: true });
      const filesAndFolders = readdirSync(directoryPath);
      const file = filesAndFolders.filter((item) => item !== ".DS_Store").map((item) => {
        const itemPath = join(directoryPath, item);
        const stats = statSync(itemPath);
        return {
          fileName: item,
          filePath: `/media/image/users/${item}`,
          fileSize: `${(stats.size * 0.000001).toFixed(2)}MB`,
          createDate: format(stats.birthtime, "yyyy-MM-dd' 'HH:mm:ss")
        };
      });
      return { data: file };
    } catch (err: any) {
      this.logger.error(err.message);
      return { error: err.message };
    }
  }

  hospitalList() {
    try {
      const directoryPath = join('uploads', 'image', 'hospitals');
      if (!existsSync(directoryPath)) mkdirSync(directoryPath, { recursive: true });
      const filesAndFolders = readdirSync(directoryPath);
      const file = filesAndFolders.filter((item) => item !== ".DS_Store").map((item) => {
        const itemPath = join(directoryPath, item);
        const stats = statSync(itemPath);
        return {
          fileName: item,
          filePath: `/media/image/hospitals/${item}`,
          fileSize: `${(stats.size * 0.000001).toFixed(2)}MB`,
          createDate: format(stats.birthtime, "yyyy-MM-dd' 'HH:mm:ss")
        };
      });
      return { data: file };
    } catch (err: any) {
      this.logger.error(err.message);
      return { error: err.message };
    }
  }

  deviceList() {
    try {
      const directoryPath = join('uploads', 'image', 'devices');
      if (!existsSync(directoryPath)) mkdirSync(directoryPath, { recursive: true });
      const filesAndFolders = readdirSync(directoryPath);
      const file = filesAndFolders.filter((item) => item !== ".DS_Store").map((item) => {
        const itemPath = join(directoryPath, item);
        const stats = statSync(itemPath);
        return {
          fileName: item,
          filePath: `/media/image/devices/${item}`,
          fileSize: `${(stats.size * 0.000001).toFixed(2)}MB`,
          createDate: format(stats.birthtime, "yyyy-MM-dd' 'HH:mm:ss")
        };
      });
      return { data: file };
    } catch (err: any) {
      this.logger.error(err.message);
      return { error: err.message };
    }
  }

  deleteFile(type: string, fileName: string) {
    let filePath = '';
    switch (type) {
      case 'firmware':
        filePath = join('uploads', 'firmwares', fileName);
        break;
      case 'user':
        filePath = join('uploads', 'image', 'users', fileName);
        break;
      case 'hospital':
        filePath = join('uploads', 'image', 'hospitals', fileName);
        break;
      case 'device':
        filePath = join('uploads', 'image', 'devices', fileName);
        break;
      default:
        throw new NotFoundException('File not found');
    }
    if (!existsSync(filePath)) throw new NotFoundException('File not found');
    unlinkSync(filePath);
    return { message: 'File deleted successfully' };
  }
}
