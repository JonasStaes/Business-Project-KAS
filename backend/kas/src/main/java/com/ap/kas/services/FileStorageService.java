package com.ap.kas.services;

import java.io.IOException;

import com.ap.kas.models.FileStorage;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    public FileStorage convert(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        System.out.println(file.getName());
        FileStorage fileStorage = new FileStorage(fileName, file.getContentType(), file.getBytes());
        return fileStorage;
    }
}
