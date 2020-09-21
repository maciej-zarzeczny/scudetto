<?php

namespace App\Http\Controllers;

use App\Button;
use Illuminate\Http\Request;

class ButtonController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin', ['except' => ['index']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {        
        return Button::get();
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
            'icon_url' => 'required', 
            'female' => 'required',           
        ]);

        $button = Button::create([
            'name' => $request->name,            
            'icon_url' => $request->icon_url,
            'female' => $request->female,
        ]);
        $button->save();

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
            $imgPath = '/images/creator/female/';
        } else {
            $imgPath = '/images/creator/';
        }
        switch ($which) 
        {
            case 'icon':                
                $request->file('image')->move(public_path($imgPath), $request->name . '.jpg');
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
     * @param  \App\Button  $button
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Button $button)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Button  $button
     * @return \Illuminate\Http\Response
     */
    public function destroy(Button $button)
    {        
        if ($button != null) {
            $file_path = public_path() . $button->icon_url; 
            if (file_exists($file_path)) {
                unlink($file_path);
            }            
        }

        $button->delete();
    }
}
