<?php

namespace App\Http\Controllers;

use App\Tkanina;
use Illuminate\Http\Request;

class TkaninaController extends Controller
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
        return Tkanina::get();
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
            'single_addon_url' => 'required',
            'addon_with_collar_url' => 'required',
            'female' => 'required'          
        ]);

        $tkanina = Tkanina::create([
            'name' => $request->name,
            'quantity' => $request->quantity,
            'icon_url' => $request->icon_url,
            'back_image_url' => $request->back_image_url,
            'single_addon_url' => $request->single_addon_url,
            'addon_with_collar_url' => $request->addon_with_collar_url,
            'female' => $request->female,
        ]);
        $tkanina->save();

        return response('success', 200);
    }

    /**
     * Function for storing images
     */
    public function addImage(Request $request)
    {        
        $which = $request->which;
        $imgPath = '';
        if ($request->female == 1) {
            $imgPath = 'images/creator/female/';
        } else {
            $imgPath = 'images/creator/';
        }
        switch ($which) 
        {
            case 'icon':                                
                $request->file('image')->move(public_path($imgPath), $request->name . '.jpg');        
                break;

            case 'back':
                $request->file('image')->move(public_path($imgPath), $request->name . 't.png');
                break;

            case 'single_addon':
                $request->file('image')->move(public_path($imgPath), $request->name . 's.png');
                break;

            case 'collar_addon':
                $request->file('image')->move(public_path($imgPath), $request->name . 'k.png');
                break;

            default:
                $request->file('image')->move(public_path($imgPath . $which . '/'), $request->name . '.png');
        }        

        return response('success', 200);    
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Tkanina  $tkanina
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tkanina $tkanina)
    {        
        $tkanina->quantity = $request->quantity;
        $tkanina->save();                
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Tkanina  $tkanina
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $tkanina = Tkanina::find($request->id);        
        if ($tkanina != null) {
            $file_path = public_path() . $tkanina->icon_url; 
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $file_path = public_path() . $tkanina->back_image_url; 
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $file_path = public_path() . $tkanina->single_addon_url; 
            if (file_exists($file_path)) {
                unlink($file_path);
            }
            $file_path = public_path() . $tkanina->addon_with_collar_url; 
            if (file_exists($file_path)) {
                unlink($file_path);
            }            
        }

        $tkanina->delete();
    }
}
