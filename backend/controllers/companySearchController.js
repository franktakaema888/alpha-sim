const { searchCompany } = require('../apis/companySearchApi.js');

const searchCompanyByName = async (req, res) => {
  const { companyName } = req.params;

  try {
    const companies = await searchCompany(companyName);
    res.status(200).json({
      success: true,
      data: companies
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to search company", 
      error: error.message
    });
  }
};

module.exports = {
  searchCompanyByName
};
