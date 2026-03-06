// src/controllers/user.controller.ts
import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId; 
    const profile = await userService.getUserProfile(userId);
    
    res.status(200).json({
      status: 'success',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const targetUserId = req.params.id;
    const { userId: requesterId, role: requesterRole } = req.user!;
    
    const updatedUser = await userService.updateUser(targetUserId, requesterId, requesterRole, req.body);
    
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};