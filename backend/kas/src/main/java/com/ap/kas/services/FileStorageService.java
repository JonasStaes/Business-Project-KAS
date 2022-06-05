package com.ap.kas.services;

import java.io.IOException;

import com.ap.kas.models.FileStorage;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 * This class is used to convert MultiPartFile objects
 */
@Service
public class FileStorageService {

    
    /** 
     * Converts a given MultiPartFile object to a FileStorage object
     * @param file - The given MultiPartFile object
     * @return FileStorage - The converted FileStorageObject
     * @throws IOException
     */
    public FileStorage convert(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        FileStorage fileStorage = new FileStorage(fileName, file.getContentType(), file.getBytes());
        return fileStorage;
    }
}