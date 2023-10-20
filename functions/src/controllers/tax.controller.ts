import { Request, Response } from 'express';
import { taxModel } from '../config/schema';

const getAllTax = async (req: Request, res: Response) => {
    try {
        const tax = await taxModel.find({ isDeleted: { $exists: false } })
     
        return res.status(200).json({
          success: true,
          message: "success get all tasks",
          data: tax
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          message: "failed to get task"
        });
    }
}

const getOneTax = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const tax = await taxModel.findById(id);
      if(!tax) {
        return res.status(404).json({
          message: "License plate not found"
        })
      }
        
      return res.status(200).json({
        success: true,
        message: "success get License plate",
        data: tax,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Internal server error while get License plate or License plate wrong format"
      });
    }
  };

const createTax = async (req: Request, res: Response) => {
    try {
        const { no } = req.body; // Change "tax" to "no"

        if (!no) {
            return res.status(400).json({ message: "Field 'no' is required" });
        }

        const newTax = await taxModel.create({ no }); // Change "tax" to "no"

        return res.status(200).json({
            success: true,
            message: "Tax registration success", // Update the message
            data: newTax
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const updateAllTax = async (req: Request, res: Response) => {
    try {
        const id  = req.params.id; // Extract the ID from URL params
        const { no, status } = req.body; // Extract 'no' and 'status' from the request body

        // Find the tax record by its unique ID and update 'no' and 'status'
        const updatedTax = await taxModel.findByIdAndUpdate({_id: id}, { no, status }, { new: true });

        if (!updatedTax) {
            return res.status(404).json({ message: "Tax record not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Tax record updated successfully",
            data: updatedTax
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error });
    }
}

const updateTax = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      console.log(req.body)

        const updatedStatus = await taxModel.updateOne({ _id: id }, { status: status });
  
        if (updatedStatus.modifiedCount > 0) {
          return res.status(200).json({
            success: true,
            message: 'Successfully updated status',
            data: {
              status: status
            }
          });
        } else {
          return res.status(404).json({
            success: false,
            message: 'No update status found for the provided ID'
          });
        }
    } catch (err) {
      console.log('Error updating status:', err);
      return res.status(500).json({
        success: false,
        message: 'An error occurred while updating the status or TransferId wrong format'
      });
    }
  };

const deleteTax = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedTax = await taxModel.findByIdAndUpdate(id,{ $set: { isDeleted: true }}, { new: true });
        

        if (deletedTax) {
            return res.status(200).json({
                success: true,
                message: 'License plate deleted successfully',
                data: deletedTax
            });
        } else {
            return res.status(404).json({
                success: false,
                message: 'License plate not found'
            });
        }
    } catch (err) {
        console.log('Error soft deleting transfer:', err);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while soft deleting transfer data or TransferId wrong format'
        });
    }
};


export { createTax, getAllTax, updateTax, getOneTax, deleteTax, updateAllTax }
