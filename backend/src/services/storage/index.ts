import { StorageService } from "./storage.service";
import { GridFSStorage } from "./gridfs.storage";

export const storage: StorageService = new GridFSStorage();