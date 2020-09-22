<?php

namespace App\Http\Controllers;

use App\GalleryImage;
use Illuminate\Http\Request;
use Image;

class GalleryImageController extends Controller
{
    /**
     * Constructor with middleware rules
     */
    public function __construct()
    {
        $this->middleware('admin', ['only' => ['store', 'update', 'destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return GalleryImage::get();        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $imagesUrls = json_decode($request->imagesNames);             

        for ($i=0; $i<count($imagesUrls); $i++)
        {
            $galleryImage = new GalleryImage([
                'url' => $imagesUrls[$i]
            ]);
            $galleryImage->save();
            
            $image = $request->file('images')[$i];

            dd('ok');
            $resizedImage = Image::make($image->path());

            $resizedImage->resize(300, null, function ($constraint) {
                $constraint->aspectRatio();
            });

            $target_path = public_path($imagesUrls[$i]);

            $resizedImage->save($target_path);
        }                

        return response('success', 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\GalleryImage  $galleryImage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GalleryImage $galleryImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\GalleryImage  $galleryImage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {      
        $galleryImage = GalleryImage::find($request->id);
        if ($galleryImage != null) 
        {
            $file_path = public_path() . $galleryImage->url;
            if (file_exists($file_path)) {
                unlink($file_path);
            } 
            $galleryImage->delete();
        }

        return response('success', 200);
    }
}
