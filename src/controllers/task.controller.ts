// src/controllers/task.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as taskService from '../services/task.service';

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const task = await taskService.createTask(userId, req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, role } = req.user!;
    const tasks = await taskService.getTasks(userId, role);
    
    res.status(200).json({
      status: 'success',
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.id;
    const { userId, role } = req.user!;
    
    const updatedTask = await taskService.updateTask(taskId, userId, role, req.body);
    
    res.status(200).json({
      status: 'success',
      message: 'Task updated successfully',
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params.id;
    const { userId, role } = req.user!;
    
    await taskService.deleteTask(taskId, userId, role);
    
    res.status(200).json({
      status: 'success',
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};