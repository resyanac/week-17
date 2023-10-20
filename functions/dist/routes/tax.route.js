"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tax_controller_1 = require("../controllers/tax.controller");
const taskRoutes = express_1.default.Router();
// taskRoutes.get('/v1/taxes',   checkRole(["admin", "staff", "approver"]), getAllTax)
// taskRoutes.get('/v1/taxes/:id',  checkRole(["admin", "staff", "approver"]), getOneTax)
// taskRoutes.post('/v1/taxes',checkRole(["admin", "approver"]),  createTax)
// taskRoutes.options('/v1/taxes/:id')
// taskRoutes.options('/v1/taxes/:id')
// taskRoutes.options('/v1/taxes')
// taskRoutes.patch('/v1/taxes/:id',   checkRole(["admin", "approver"]), updateTax)
// taskRoutes.put('/v1/taxes/:id',  checkRole([ "approver"]),  updateAllTax)
// taskRoutes.delete('/v1/taxes/:id',   checkRole([ "approver"]), deleteTax)
// taskRoutes.get('/v1/taxes', cors(clientAccess.globalClient),   checkRole(["admin", "staff", "approver"]), getAllTax)
// taskRoutes.get('/v1/taxes/:id', cors(clientAccess.globalClient),  checkRole(["admin", "staff", "approver"]), getOneTax)
// taskRoutes.post('/v1/taxes', cors(clientAccess.globalClient),  checkRole(["admin", "approver"]),  createTax)
// taskRoutes.options('/v1/taxes/:id')
// taskRoutes.options('/v1/taxes/:id')
// taskRoutes.options('/v1/taxes')
// taskRoutes.patch('/v1/taxes/:id', cors(clientAccess.globalClient),   checkRole(["admin", "approver"]), updateTax)
// taskRoutes.put('/v1/taxes/:id', cors(clientAccess.globalClient),  checkRole([ "approver"]),  updateAllTax)
// taskRoutes.delete('/v1/taxes/:id',cors(clientAccess.globalClient),   checkRole([ "approver"]), deleteTax)
taskRoutes.get('/v1/taxes', tax_controller_1.getAllTax);
taskRoutes.get('/v1/taxes/:id', tax_controller_1.getOneTax);
taskRoutes.post('/v1/taxes', tax_controller_1.createTax);
taskRoutes.options('/v1/taxes/:id');
taskRoutes.options('/v1/taxes/:id');
taskRoutes.options('/v1/taxes');
taskRoutes.patch('/v1/taxes/:id', tax_controller_1.updateTax);
taskRoutes.put('/v1/taxes/:id', tax_controller_1.updateAllTax);
taskRoutes.delete('/v1/taxes/:id', tax_controller_1.deleteTax);
exports.default = taskRoutes;
