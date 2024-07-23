import { Router } from 'express';
import { addCompany, getCompanies } from "../controllers/company.controller.js";

const companyRoutes = Router();

companyRoutes.route('/').get(getCompanies);
companyRoutes.route('/add-company').post(addCompany)

export default companyRoutes;
