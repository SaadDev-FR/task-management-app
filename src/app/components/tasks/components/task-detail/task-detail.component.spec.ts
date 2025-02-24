import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDetailComponent } from './task-detail.component';
import { TaskServiceService } from 'src/app/services/task-service/task-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let taskService: jasmine.SpyObj<TaskServiceService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const taskServiceMock = jasmine.createSpyObj('TaskServiceService', ['getTaskById']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteMock = {
      snapshot: { paramMap: { get: (key: string) => '1' } }
    };

    await TestBed.configureTestingModule({
      declarations: [TaskDetailComponent],
      providers: [
        { provide: TaskServiceService, useValue: taskServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskServiceService) as jasmine.SpyObj<TaskServiceService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve task by ID on init', () => {
    const mockTask = { id: 1, title: 'Test Task', description: 'Task Description' };
    taskService.getTaskById.and.returnValue(of(mockTask));

    component.ngOnInit();

    expect(taskService.getTaskById).toHaveBeenCalledWith(1);
    expect(component.task).toEqual(mockTask);
  });

  it('should navigate to tasks list when goBack is called', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  });
});
