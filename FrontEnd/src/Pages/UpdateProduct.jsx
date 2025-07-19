"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X, Plus, Save, Trash2 } from "lucide-react"

// Mock product data - in a real app, this would come from your API
const mockProducts = {
  1: {
    id: 1,
    name: "Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    price: "99.99",
    category: "Electronics",
    stock: "45",
    sku: "WH-001",
    weight: "0.3",
    dimensions: "20 x 18 x 8 cm",
    tags: ["wireless", "audio", "premium"],
    images: [
      "/placeholder.svg?height=200&width=200&text=Headphones+1",
      "/placeholder.svg?height=200&width=200&text=Headphones+2",
      "/placeholder.svg?height=200&width=200&text=Headphones+3",
    ],
  },
  2: {
    id: 2,
    name: "Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt available in multiple colors and sizes.",
    price: "24.99",
    category: "Clothing",
    stock: "120",
    sku: "CT-002",
    weight: "0.2",
    dimensions: "30 x 40 x 1 cm",
    tags: ["cotton", "casual", "comfortable"],
    images: [
      "/placeholder.svg?height=200&width=200&text=T-Shirt+1",
      "/placeholder.svg?height=200&width=200&text=T-Shirt+2",
    ],
  },
}

export default function UpdateProduct() {
  const navigate = useNavigate()
  const { id: productId } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState([])
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    sku: "",
    weight: "",
    dimensions: "",
    tags: [],
  })
  const [currentTag, setCurrentTag] = useState("")

  useEffect(() => {
    // Load product data - in a real app, this would be an API call
    const mockProduct = mockProducts[productId]
    if (mockProduct) {
      setProduct({
        name: mockProduct.name,
        description: mockProduct.description,
        price: mockProduct.price,
        category: mockProduct.category,
        stock: mockProduct.stock,
        sku: mockProduct.sku,
        weight: mockProduct.weight,
        dimensions: mockProduct.dimensions,
        tags: mockProduct.tags,
      })
      setImages(mockProduct.images)
    }
  }, [productId])

  const handleImageUpload = (e) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(
        (file, index) => `/placeholder.svg?height=200&width=200&text=New+Image+${images.length + index + 1}`,
      )
      setImages([...images, ...newImages])
    }
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (currentTag.trim() && !product.tags.includes(currentTag.trim())) {
      setProduct({
        ...product,
        tags: [...product.tags, currentTag.trim()],
      })
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setProduct({
      ...product,
      tags: product.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Updated product data:", { ...product, images })

    setIsLoading(false)
    navigate("/products")
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      navigate("/products")
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/products">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-black">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-black">Update Product</h2>
            <p className="text-gray-600">Modify product details and information</p>
          </div>
        </div>
        <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Product
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Product Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Product Information</CardTitle>
                <CardDescription className="text-gray-600">Update the basic details about your product</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-black">
                      Product Name *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={product.name}
                      onChange={(e) => setProduct({ ...product, name: e.target.value })}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku" className="text-black">
                      SKU
                    </Label>
                    <Input
                      id="sku"
                      value={product.sku}
                      onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-black">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    required
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    className="border-gray-300 min-h-[120px]"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-black">
                      Price ($) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      required
                      value={product.price}
                      onChange={(e) => setProduct({ ...product, price: e.target.value })}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock" className="text-black">
                      Stock Quantity *
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      required
                      value={product.stock}
                      onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-black">
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.01"
                      value={product.weight}
                      onChange={(e) => setProduct({ ...product, weight: e.target.value })}
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dimensions" className="text-black">
                    Dimensions (L x W x H)
                  </Label>
                  <Input
                    id="dimensions"
                    value={product.dimensions}
                    onChange={(e) => setProduct({ ...product, dimensions: e.target.value })}
                    className="border-gray-300"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Images */}
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Product Images</CardTitle>
                <CardDescription className="text-gray-600">
                  Update product images to showcase your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image || "/placeholder.svg?height=150&width=150"}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 left-2 bg-black text-white text-xs">Main</Badge>
                      )}
                    </div>
                  ))}

                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-6 h-6 mb-2 text-gray-400" />
                      <p className="text-xs text-gray-500">Add Images</p>
                    </div>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Category & Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-black">
                    Category *
                  </Label>
                  <Select
                    value={product.category}
                    onValueChange={(value) => setProduct({ ...product, category: value })}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Books">Books</SelectItem>
                      <SelectItem value="Beauty">Beauty</SelectItem>
                      <SelectItem value="Toys">Toys</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-black">Tags</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      className="border-gray-300"
                      placeholder="Add tag"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm" className="bg-black text-white hover:bg-gray-800">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-gray-300">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-1 h-auto p-0 text-gray-500 hover:text-red-500"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button type="submit" disabled={isLoading} className="w-full bg-black text-white hover:bg-gray-800">
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Updating Product...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Product
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  onClick={() => navigate("/products")}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
