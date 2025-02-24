import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskServiceService } from 'src/app/services/task-service/task-service.service';
import * as TaskActions from '../../../../store/task.actions';
import { selectAllTasks, selectLoading } from 'src/app/store/task.selectors';
import { Task } from '../../../../models/tasks/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  selectedTask: Task[] = [];
  tasks$: Observable<Task[]>;
  loading$: Observable<boolean>;
  showEditModal: boolean = false;
  taskForm: FormGroup;
  createTask!: FormGroup;
  isEditing: boolean = false;
  selectedTaskId: number | null = null;
  constructor(private taskService: TaskServiceService,private fb: FormBuilder,private router: Router,private store: Store) {
    this.taskForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
    this.createTask = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
    this.tasks$ = this.store.select(selectAllTasks);
    this.loading$ = this.store.select(selectLoading);
  }

 

  ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
    // this.taskService.getTasks().subscribe((data) => (this.tasks = data));
  }

  openCreateModal() {
    this.isEditing = false;
    this.selectedTaskId = null;
    this.taskForm.reset();
    this.showEditModal = true;
  }

  deleteTask(id:number)
  {
    this.store.dispatch(TaskActions.deleteTask({ id }));
  }


  openEditModal(task: any) {
    this.selectedTask.push(task);
    this.selectedTaskId = task.id;
    this.taskForm.patchValue(task);
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedTaskId = null;
    this.taskForm.reset();
  }
  updateTask() {
    if (this.taskForm.valid) {
      this.store.dispatch(TaskActions.updateTask(this.taskForm.value ));
      // this.taskService.updateTask(this.taskForm.value).subscribe(() => {
      //   this.taskService.getTasks();
      //   this.closeEditModal(); 
      // });
    }
  }

  addTask() {
    this.taskForm.patchValue({ id: Math.floor(Math.random() * 10) });
    if (this.taskForm.valid) {
      this.store.dispatch(TaskActions.addTask({ task: this.taskForm.value }));
      this.closeEditModal();
    }
  }

  navigateToTaskDetail(id:number): void {
    this.router.navigate(['tasks',id]);
  }
}
