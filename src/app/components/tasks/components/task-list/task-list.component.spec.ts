import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TaskServiceService } from 'src/app/services/task-service/task-service.service';
import * as TaskActions from '../../../../store/task.actions';
import { selectAllTasks, selectLoading } from 'src/app/store/task.selectors';
import { Task } from '../../../../models/tasks/task';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import 'jasmine'


describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: MockStore;
  let router: Router;

  const mockTasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description 1', status: 'Pending', dueDate: '2025-02-28' },
    { id: 2, title: 'Task 2', description: 'Description 2', status: 'Completed', dueDate: '2025-03-01' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [ReactiveFormsModule, StoreModule.forRoot({})],
      providers: [
        FormBuilder,
        provideMockStore({
          selectors: [
            { selector: selectAllTasks, value: mockTasks },
            { selector: selectLoading, value: false },
          ],
        }),
        { provide: TaskServiceService, useValue: {} },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTasks action on init', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(TaskActions.loadTasks());
  });

  it('should dispatch deleteTask action when deleteTask is called', () => {
    spyOn(store, 'dispatch');
    component.deleteTask(1);
    expect(store.dispatch).toHaveBeenCalledWith(TaskActions.deleteTask({ id: 1 }));
  });

  it('should open the edit modal and set selected task', () => {
    const task = mockTasks[0];
    component.openEditModal(task);
    expect(component.showEditModal).toBeTrue();
    expect(component.selectedTaskId).toBe(task.id);
    expect(component.taskForm.value).toEqual(task);
  });

  it('should close the edit modal and reset the form', () => {
    component.closeEditModal();
    expect(component.showEditModal).toBeFalse();
    expect(component.selectedTaskId).toBeNull();
    expect(component.taskForm.value).toEqual({ id: null, title: '', description: '', status: '', dueDate: '' });
  });

  it('should dispatch updateTask action when updateTask is called', () => {
    spyOn(store, 'dispatch');
    component.taskForm.setValue(mockTasks[0]);
    component.updateTask();
    expect(store.dispatch).toHaveBeenCalledWith(TaskActions.updateTask(mockTasks[0]));
  });

  it('should navigate to task detail when navigateToTaskDetail is called', () => {
    component.navigateToTaskDetail(1);
    expect(router.navigate).toHaveBeenCalledWith(['tasks', 1]);
  });
});
