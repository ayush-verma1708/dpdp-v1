import { Router } from 'express';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { createCoverage, deleteCoverage, getCoverageById, getCoverages, getCoveragesInScope, updateCoverage } from '../controllers/coverage.controller.js';

const coverageRouter = Router()

coverageRouter.route("/").get(getCoverages);
coverageRouter.route("/add-coverage").post(createCoverage);
coverageRouter.route('/scopeds/:scopedId').get(getCoveragesInScope);
coverageRouter.route("/coverage-details/:id").get(getCoverageById);
coverageRouter.route("/coverage-update/:id").put(updateCoverage);
coverageRouter.route("/coverage-delete/:id").delete(deleteCoverage);
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import { createCoverage, deleteCoverage, getCoverages, updateCoverage } from '../controllers/coverage.controller.js';

const coverageRouter = Router()

coverageRouter.route('/').get(getCoverages);
coverageRouter.route('/add-coverage').post(createCoverage);
coverageRouter.route("/:id").put(updateCoverage);
coverageRouter.route("/:id").delete(deleteCoverage);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

export default coverageRouter