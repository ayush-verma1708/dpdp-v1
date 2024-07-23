import { Router } from 'express';
import { addCompany, getCompanies } from "../controllers/company.controller.js";

const companyRoutes = Router();

companyRoutes.route('/').post(addCompany).get(getCompanies);

export default companyRoutes;
