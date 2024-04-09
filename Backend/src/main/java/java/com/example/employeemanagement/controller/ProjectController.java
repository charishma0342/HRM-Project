package com.example.employeemanagement.controller;

import com.example.employeemanagement.expection.ProjectNotFound;
import com.example.employeemanagement.request.AddProjectRequest;
import com.example.employeemanagement.request.ClientProjectRequest;
import com.example.employeemanagement.response.ErrorResponse;
import com.example.employeemanagement.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/get/all/projects")
    public ResponseEntity<?> fetchAllProjectDetails(){
        try {
            return new ResponseEntity<>(projectService.findAllProjects(), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Bad Credentials"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/get/all/projects/client")
    public ResponseEntity<?> fetchClientProjectDetails(@RequestBody ClientProjectRequest clientProjectRequest){
        try {
            return new ResponseEntity<>(projectService.findClientProjects(clientProjectRequest.getClient()), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Bad Credentials"), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/get/{projectId}/details")
    public ResponseEntity<?> fetchProjectDetailsById(@PathVariable(value = "projectId")Integer projectId){
        try {
            return new ResponseEntity<>(projectService.findProjectDetails(projectId), HttpStatus.OK);
        } catch (ProjectNotFound e){
            return new ResponseEntity<>(new ErrorResponse(projectId + " entered is Invalid"), HttpStatus.BAD_REQUEST);
        } catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Bad Credentials"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProject(@RequestBody AddProjectRequest addProjectRequest){
        try {
            return new ResponseEntity<>(projectService.addNewProject(addProjectRequest), HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>(new ErrorResponse("Bad Request"), HttpStatus.UNAUTHORIZED);
        }
    }
}
