import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskServiceService } from './task-service.service';
import { Task } from '../../models/tasks/task';

describe('TaskServiceService', () => {
  let service: TaskServiceService;
  let httpMock: HttpTestingController;

  const mockTasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description 1', status: 'Pending', dueDate: '2024-02-25' },
    { id: 2, title: 'Task 2', description: 'Description 2', status: 'Completed', dueDate: '2024-02-26' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskServiceService]
    });

    service = TestBed.inject(TaskServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks from API', () => {
    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(service.apiUrl); 
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should fetch a single task by ID', () => {
    const taskId = 1;
    service.getTaskById(taskId).subscribe((task) => {
      expect(task).toEqual(mockTasks[0]);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/${taskId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks[0]);
  });

  it('should add a new task', () => {
    const newTask: Task = { id: 3, title: 'New Task', description: 'New Desc', status: 'Pending', dueDate: '2024-02-27' };

    service.createTask(newTask).subscribe((task) => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne(service.apiUrl); 
    expect(req.request.method).toBe('POST');
    req.flush(newTask);
  });

  it('should update an existing task', () => {
    const updatedTask: Task = { id: 1, title: 'Updated Task', description: 'Updated Desc', status: 'Completed', dueDate: '2024-02-28' };

    service.updateTask(updatedTask).subscribe((task) => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/${updatedTask.id}`);
    expect(req.request.method).toBe('PATCH'); 
    req.flush(updatedTask);
  });

  it('should delete a task', () => {
    const taskId = 1;

    service.deleteTask(taskId).subscribe((response) => {
      expect(response).toBeUndefined(); 
    });

    const req = httpMock.expectOne(`${service.apiUrl}/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); 
  });
});
