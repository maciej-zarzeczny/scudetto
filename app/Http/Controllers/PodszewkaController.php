<?php

namespace App\Http\Controllers;

use App\Podszewka;
use Illuminate\Http\Request;

class PodszewkaController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin', ['except' => ['index', 'update']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Podszewka::get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'quantity' => 'required|numeric',
            'icon_url' => 'required',
            'back_image_url' => 'required',
            'image_url' => 'required',
            'back_female_image_url' => 'required',
        ]);

        $podszewka = Podszewka::create([
            'name' => $request->name,
            'quantity' => $request->quantity,
            'icon_url' => $request->icon_url,
            'back_image_url' => $request->back_image_url,
            'image_url' => $request->image_url,   
            'back_female_image_url' => $request->back_female_image_url,
        ]);
        $podszewka->save();

        return response('success', 200);
    }

    /**
     * Function for storing images
     */
    public function addImage(Request $request)
    {
        $which = $request->which;
        switch ($which) 
        {
            case 'icon':                
                $request->file('image')->move(public_path('images/creator/'), $request->name . '.jpg');        
                break;

            case 'back':
                $request->file('image')->move(public_path('images/creator/'), $request->name . 'p.png');
                break;

            case 'front':
                $request->file('image')->move(public_path('images/creator/'), $request->name . '.png');
                break;
                
            case 'back_female':
                $request->file('image')->move(public_path('images/creator/female/'), $request->name . '.png');
                break;
        }        

        return response('success', 200);    
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Podszewka  $podszewka
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Podszewka $podszewka)
    {
        $podszewka->quantity = $request->quantity;
        $podszewka->save();       
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Podszewka  $podszewka
     * @return \Illuminate\Http\Response
     */
    public function destroy(Podszewka $podszewka)
    {        
        if ($podszewka != null) {
            $file_path = public_path() . $podszewka->icon_url; 
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $file_path = public_path() . $podszewka->back_image_url; 
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $file_path = public_path() . $podszewka->image_url; 
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $file_path = public_path() . $podszewka->back_female_image_url; 
            if (file_exists($file_path)) {
                unlink($file_path);
            }
        }

        $podszewka->delete();
    }
}
