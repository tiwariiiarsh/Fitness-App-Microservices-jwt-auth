package com.example.fitness.exceptions;

public class ResourceNotFoundException  extends RuntimeException{
    public ResourceNotFoundException(){
        super("Resource not found on server!!");
    }

    public ResourceNotFoundException(String message){
        super(message);
    }
//    add extra properties for exception that you want to manage
}
