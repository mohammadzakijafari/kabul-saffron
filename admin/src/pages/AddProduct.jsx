import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios';

const uri = "http://localhost:3000/products";

const AddProduct = () => {
    // Declaring state variable for each image
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");

    // Declaring product state variable with multiple fields
    const [product, setProduct] = useState({
        productName: "",
        description: "",
        regularPrice: "",
        discountPrice: "",
    });

    // Declaring state variable for Product feature drop down menu
    const [productFeature, setProductFeature] = useState("featured");

    // Handle input change when user enters product's value
    function handleChange (e) {
        const {name, value} = e.target;
        setProduct({...product, [name]: value, });
    }

    let newProduct = {
        ...product,
        productFeature,
    }
    // Function to add a new Product
    async function addNewProduct (e) {
        e.preventDefault();
        try {
            let formData = new FormData();
            formData.append("productName", product.productName);
            formData.append("description", product.description);
            formData.append("regularPrice", product.regularPrice);
            formData.append("discountPrice", product.discountPrice);
            formData.append("productFeature", productFeature);
            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);
            let res = await axios.post(`${uri}/create`, formData);
            alert(res.data.msg);
            console.log(res.data);
            formData = "";
        } catch (error) {
            console.log(error);
            console.log("Connection to Server Problem");
        }
    };

  return (
    <form className='flex flex-col w-full items-start gap-3'>
        <div>
            <p className='mb-10 text-2xl'> Upload Product Images </p>
            <div className='flex gap-7 my-5'>
                <label htmlFor='image1'>
                    {!image1 ? <FaCloudUploadAlt size={100} className='border border-black border-dashed p-2' /> : <img className='w-28 h-28' src = {URL.createObjectURL(image1)} /> } 
                    <input onChange = {(e) => setImage1(e.target.files[0])} type='file' id='image1' hidden />
                </label>

                <label htmlFor='image2'>
                    {!image2 ? <FaCloudUploadAlt size={100} className='border border-black border-dashed p-2' /> : <img className='w-28 h-28' src = {URL.createObjectURL(image2)} /> }
                    <input onChange = {(e) => setImage2(e.target.files[0])} type='file' id='image2' hidden />
                </label>

                <label htmlFor='image3'>
                    {!image3 ? <FaCloudUploadAlt size={100} className='border border-black border-dashed p-2' /> : <img className='w-28 h-28' src = {URL.createObjectURL(image3)} /> }
                    <input onChange = {(e) => setImage3(e.target.files[0])} type='file' id='image3' hidden />
                </label>

                <label htmlFor='image4'>
                    {!image4 ? <FaCloudUploadAlt size={100} className='border border-black border-dashed p-2' /> : <img className='w-28 h-28' src = {URL.createObjectURL(image4)} /> }
                    <input onChange = {(e) => setImage4(e.target.files[0])} type='file' id='image4' hidden />
                </label>
            </div>
        </div>
        <div className='w-4/6 my-10'>
            <div className='flex flex-col gap-3 mb-5'>
                <label htmlFor='productName' className='text-gray-700 font-bold'> Product Name </label>
                <input
                    type='text'
                    id='productName'
                    name='productName'
                    className='border border-black rounded w-full py-2 px-3 mb-2'
                    placeholder='eg. Beautiful Apartment In Miami'
                    required
                    value =  { product.productName }
                    onChange = { handleChange }
                />
            </div>
            <div className='mb-5'>
                <label htmlFor='description' className='block text-gray-700 font-bold mb-2'> Product Description </label>
                <textarea
                    id='description'
                    name='description'
                    className='border border-black rounded w-full py-2 px-3'
                    rows='6'
                    placeholder='Add any job duties, expectations, requirements, etc'
                    value =  { product.description }
                    onChange = { handleChange }
                ></textarea>
            </div>
            <div className='w-full flex gap-10'>
                <div className='w-full mb-4'>
                    <label htmlFor='regularPrice' className='block text-gray-700 font-bold mb-2'> Regular Price </label>
                    <input
                        type='text'
                        id='regularPrice'
                        name='regularPrice'
                        className='border border-black rounded w-full py-2 px-3 mb-2'
                        placeholder='Product Regular Price'
                        required
                        value =  { product.regularPrice }
                        onChange = { handleChange }
                    />
                </div>
                <div className='w-full mb-4'>
                    <label className='block text-gray-700 font-bold mb-2'> Discount Price </label>
                    <input
                        type='text'
                        id='discountPrice'
                        name='discountPrice'
                        className='border border-black rounded w-full py-2 px-3 mb-2'
                        placeholder='Product Discounted Price'
                        required
                        value =  { product.discountPrice }
                        onChange = { handleChange }
                    />
                </div>
            </div>
            <div className='mb-4'>
              <label htmlFor='productFeature' className='block text-gray-700 font-bold mb-2'> Product Feature </label>
              <select
                id='productFeature'
                name='productFeature'
                className='border border-black rounded w-full py-2 px-3'
                required
                value = {productFeature}
                onChange = {(e) => setProductFeature(e.target.value)}
              >
                <option value=''> Select Zaffron Feature </option>
                <option value='featured'> Featured </option>
                <option value='bestSeller'> Best Seller </option>
                <option value='firstQuality'> First Quality </option>
                <option value='secondSuality'> Second Quality </option>
              </select>
            </div>

            <div className='my-14'>
              <button
                className='bg-red-700 hover:bg-red-600 text-white font-bold py-3 px-4 rounded w-36 focus:outline-none focus:shadow-outline'
                type='submit'
                onClick = { addNewProduct }
                >
                Add Product
              </button>
            </div>
        </div>
    </form>
  )
}

export default AddProduct