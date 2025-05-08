import { Controller, Post, UseInterceptors, UploadedFile, Get, BadRequestException, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('drive')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: async (req, file, callback) => {
          const uploadPath = join('uploads', 'firmwares');
          if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      })
    }),
  )
  uploadFirmware(@UploadedFile() file: Express.Multer.File) {
    return { message: 'File uploaded successfully', path: `/media/firmwares/${file.filename}` }
  }

  @Post('csv')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: async (req, file, callback) => {
          const uploadPath = join('uploads', 'csv');
          if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          callback(null, file.originalname);
        },
      })
    }),
  )
  uploadCsv(@UploadedFile() file: Express.Multer.File) {
    return { message: 'File uploaded successfully', path: `/media/csv/${file.filename}` }
  }

  @Post('image/user')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: async (req, file, callback) => {
          const uploadPath = join('uploads', 'image', 'users');
          if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif|webp)$/)) {
          return callback(new BadRequestException('Only image files are allowed!'), false);
        }
        callback(null, true);
      }
    })
  )
  uploadUser(@UploadedFile() file: Express.Multer.File) {
    return { message: 'File uploaded successfully', path: `/media/image/users/${file.filename}` }
  }

  @Post('image/hospital')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: async (req, file, callback) => {
          const uploadPath = join('uploads', 'image', 'hospitals');
          if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif|webp)$/)) {
          return callback(new BadRequestException('Only image files are allowed!'), false);
        }
        callback(null, true);
      }
    })
  )
  uploadHospital(@UploadedFile() file: Express.Multer.File) {
    return { message: 'File uploaded successfully', path: `/media/image/hospitals/${file.filename}` }
  }

  @Post('image/device')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: async (req, file, callback) => {
          const uploadPath = join('uploads', 'image', 'devices');
          if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif|webp)$/)) {
          return callback(new BadRequestException('Only image files are allowed!'), false);
        }
        callback(null, true);
      }
    })
  )
  uploadDevice(@UploadedFile() file: Express.Multer.File) {
    return { message: 'File uploaded successfully', path: `/media/image/devices/${file.filename}` }
  }

  @Get('drive')
  firmwareList() {
    return this.appService.firmwareList();
  }

  @Get('csv')
  csvList() {
    return this.appService.csvList();
  }

  @Get('image/user')
  userList() {
    return this.appService.userList();
  }

  @Get('image/hospital')
  hospitalList() {
    return this.appService.hospitalList();
  }

  @Get('image/device')
  deviceList() {
    return this.appService.deviceList();
  }

  @Delete('drive/:filename')
  deleteFirmware(@Param('filename') filename: string) {
    return this.appService.deleteFile('firmware', filename);
  }

  @Delete('image/user/:filename')
  deleteUser(@Param('filename') filename: string) {
    return this.appService.deleteFile('user', filename);
  }

  @Delete('image/hospital/:filename')
  deleteHospital(@Param('filename') filename: string) {
    return this.appService.deleteFile('hospital', filename);
  }

  @Delete('image/device/:filename')
  deleteDevice(@Param('filename') filename: string) {
    return this.appService.deleteFile('device', filename);
  }

  @Delete('csv/:filename')
  deleteCsv(@Param('filename') filename: string) {
    return this.appService.deleteFile('csv', filename);
  }
}
