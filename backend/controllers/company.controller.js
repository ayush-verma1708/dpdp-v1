import { Company } from "../models/company.model.js"

// Add a company
const addCompany = async (req, res) => {
  const { name, address, phone } = req.body;
  const company = new Company({
    name,
    address,
    phone,
  });
  const createdCompany = await company.save();
  res.status(201).json(createdCompany);
};

// Get companies with pagination
const getCompanies = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Company.countDocuments({});
  const companies = await Company.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ companies, page, pages: Math.ceil(count / pageSize) });
};

export { addCompany, getCompanies };
