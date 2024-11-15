const db = require('../../../IndexFiles/modelsIndex'); // Adjust path if necessary

// Create a new Product
exports.createProduct = async (req, res) => {
  try {
    // Check if an image was uploaded
    if (!req.file) {
      return res.status(400).send({ error: 'Please upload an image' });
    }

    // Extract the product details from the request body
    const { product_title, product_description, product_tag, status, user_id } = req.body;

    // Ensure that all necessary fields are provided
    if (!product_title || !product_description || !product_tag || !user_id) {
      return res.status(400).send({ error: 'All product fields are required' });
    }

    // Set the path to the uploaded image (relative to the server root)
    const product_image = `/uploads/${req.file.filename}`;

    // Create the product in the database
    const product = await db.product.create({
      product_title,
      product_description,
      product_tag,
      product_image,  // Store the image path in the database
      user_id,        // Assuming you are passing the user_id from the request body
      status,
    });

    // Return a success response
    res.status(201).send({message: "Product Created Successfully",product: product
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error); // Log the error for debugging purposes
    res.status(500).send({ error: error.message || "Server Error" });
  }
};



exports.getAllProduct = async(req,res) =>{
  try {
    const getAllData = await db.product.findAll({where:{isDeleted:false}});
    if (getAllData && getAllData.length > 0) {
      return res.status(200).send({code: 200, message: "All Products Get Successfully", data: getAllData});
    } else {
      return res.status(404).send({code: 404, message: "Record Not Found"});
    }
  } catch (error) {
    return res.status(500).send({code: 500, message: error.message || "Server Error"});
  }
}


exports.getAllProductById = async(req, res) => {
  try {
    const { id } = req.params;
    const getData = await db.product.findOne({ where: { isDeleted: false, id: id } });
    if (getData) {
      return res.status(200).send({ code: 200, message: "Product Retrieved Successfully", data: getData });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: error.message || "Server Error" });
  }
}


// exports.updateProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { product_title, product_description, product_tag, product_image, status } = req.body;

//     const getData = await db.product.findOne({ where: { id: id, isDeleted: false } });

//     if (!getData) {
//       return res.status(404).send({ code: 404, message: "Record Not Found" });
//     }

//     await getData.update({
//       product_title,
//       product_description,
//       product_tag,
//       product_image,
//       status: status || getData.status
//     });

//     return res.status(200).send({code: 200,message: "Product updated successfully",data: getData});
//   } catch (error) {
//     return res.status(500).send({ code: 500, message: error.message || "Server Error" });
//   }
// };






exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params; 
    const { product_title, product_description, product_tag, status,user_id } = req.body;
    
    
    const getData = await db.product.findOne({ where: { id: id, isDeleted: false } });

    
    if (!getData) {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    }

   
    let product_image = getData.product_image; 

    if (req.file) {
      
      product_image = `/uploads/${req.file.filename}`;
    }

   
    await getData.update({
      product_title,
      product_description,
      product_tag,
      product_image,
      user_id, 
      status: status || getData.status, 
    });

    
    return res.status(200).send({ code: 200, message: "Product updated successfully", data: getData });
    
  } catch (error) {
  
    return res.status(500).send({ code: 500, message: error.message || "Server Error" });
  }
};


exports.DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const getData = await db.product.findOne({ where: { id: id, isDeleted: false } });

    if (!getData) {
    
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    }

    await getData.update({ isDeleted: true });

    return res.status(200).send({
      code: 200,
      message: "Product  deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({ code: 500, message: error.message || "Server Error" });
  }
};
