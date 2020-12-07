<?php

namespace App\Http\Controllers;

use App\Product;
use App\Image;
use Illuminate\Http\Request;
use Illuminate\Http\File;
use App\Size;
use function GuzzleHttp\json_decode;
use App\Tkanina;
use App\Podszewka;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin', ['only' => ['store', 'update', 'destroy']]);
    }

    public function index()
    {        
        $products = Product::all();        
        return view('products.index', compact('products'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'shortDescription' => 'required',
            'longDescription' => 'required',
            'materials' => 'required',
            'shortEnglishDescription' => 'required',
            'longEnglishDescription' => 'required',
            'englishMaterials' => 'required',
            'price' => 'required',                  
        ]);        

        $product = Product::create([
            'name' => $request->name,
            'shortDescription' => $request->shortDescription,
            'longDescription' => $request->longDescription,
            'materials' => $request->materials,
            'shortEnglishDescription' => $request->shortEnglishDescription,
            'longEnglishDescription' => $request->longEnglishDescription,
            'englishMaterials' => $request->englishMaterials,
            'price' => $request->price,
            'discountPrice' => $request->discountPrice,
            'type' => $request->type,
        ]);
        $product->save();

        // Handle sizes if product is not a voucher
        if ($product->type != 'voucher') {
            $sizes = json_decode($request->sizes);
            $quantities = json_decode($request->quantities);

            for ($i=0; $i<count($sizes); $i++) {
            if ($sizes[$i] != null && is_numeric($quantities[$i])) {
                $product->sizes()->attach(Size::get()->where('sizeName', '==', $sizes[$i])->first(), ['quantity' => $quantities[$i]]);
            }                    
        }        
        }        

        // Handle images
        $imagesNames = json_decode($request->imagesNames);        

        for ($i=0; $i<count($imagesNames); $i++) {                      
            $image = Image::create([
                'product_id' => $product->id,
                'image_url' => $imagesNames[$i]
            ]);
            $image->save();            
            $request->file('images')[$i]->move(public_path('images'), $imagesNames[$i]);
        }
        
        return response()->json('Product added');
    }

    public function show(Product $product)
    {        
        return view('products.product', compact('product'));
    }

    public function update(Request $request, Product $product)
    {
        $product->name = $request->name;
        $product->shortDescription = $request->shortDescription;
        $product->longDescription = $request->longDescription;
        $product->englishMaterials = $request->englishMaterials;
        $product->shortEnglishDescription = $request->shortEnglishDescription;
        $product->longEnglishDescription = $request->longEnglishDescription;
        $product->materials = $request->materials;
        $product->price = $request->price;        
        $product->discountPrice = $request->discountPrice;                

        $product->save();        

        $product->sizes()->detach();
        $sizes = json_decode($request->sizes);
        $quantities = json_decode($request->quantities);

        for ($i=0; $i<count($sizes); $i++) {
            if ($sizes[$i] != null && is_numeric($quantities[$i])) {
                $product->sizes()->attach(Size::get()->where('sizeName', '==', $sizes[$i])->first(), ['quantity' => $quantities[$i]]);
            }                    
        }        
        return response()->json('Product updated');
    }

    public function updateSize(Request $request, $id) 
    {        
        if (!$request->customProduct) {
            $product = Product::find($id);
            $size = Size::where('sizeName', $request->choosedSize)->get()->first();
            $current_quantity = $product->sizes->find($size->id)->pivot->quantity;
            $new_quantity = $current_quantity - $request->choosedAmount;

            $product->sizes()->updateExistingPivot($size->id, ['quantity' => $new_quantity]);
        }
        // } else {
        //     $tkanina = Tkanina::where('name', $request->tkanina)->get()->first();
        //     $podszewka = Podszewka::where('name', $request->podszewka)->get()->first();

        //     $tkanina->quantity -= 1;
        //     $podszewka->quantity -= 1;

        //     $tkanina->save();
        //     $podszewka->save();
        // }  
        return response()->json('Size updated');
    }

    public function destroy(Product $product)
    {                    
        foreach ($product->images as $image) {
            $file_path = public_path() . $image->image_url; 
            if (file_exists($file_path)) {
                unlink($file_path);
            }
        }
        foreach ($product->sizes as $size) {
            $product->sizes()->detach($size);
        }
        $product->delete();        
    }    
}
