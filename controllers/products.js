const Product = require("../models/product");


const getAllProducts = async (req, res) => {
    const { company, name, featured, sort, select } = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }

    if(featured){
        queryObject.featured = featured;
    }

    if(name){
        queryObject.name = { $regex: name, $options: "i"};
    }

    let apiData = Product.find(queryObject);

    if (sort) {
        let sortFix = sort.split(",").json(" ");
        apiData = apiData.sort(sortFix);
    }

    // (select = name company;)


    if (select) {
        // let selectFix = select.replace(",", " ");
        let selectFix = select.split(",").json(" ");
        apiData = apiData.select(selectFix);
    }

    // pagination 

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page -1) * limit;

    apiData = apiData.skip(skip).limit(limit);


    console.log(queryObject);

    const myData = await apiData;
    res.status(200).json({ myData, nbHits: myData.length});
    // res.status(200).json({ msg: "I am getAllProducts" });
};


const getAllProductsTesting = async (req, res) => {
    const myData = await Product.find(req.query).sort("name company");

    res.status(200).json({ myData});
    // res.status(200).json({ msg: "I am getAllProducts" });
};

module.exports = { getAllProducts, getAllProductsTesting};