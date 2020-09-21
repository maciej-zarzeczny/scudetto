<?php

namespace App\Http\Controllers;

use App\Kroj;
use Illuminate\Http\Request;

class KrojController extends Controller
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
        return Kroj::get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {        
        $kroj = new Kroj([
            'name' => $request->name,
            'has_collar' => $request->has_collar,
            'female' => $request->female,
        ]);                        
        $kroj->save();     

        if ($kroj['female'] == 1) {            
            $request->file('image')->move(public_path('images/creator/female'), $request->name . '.png');
        } else {
            $request->file('image')->move(public_path('images/creator'), $request->name . '.png');
        }        

        return response('success', 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Kroj  $kroj
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Kroj $kroj)
    {
        $oldName = $request->oldName;        
        $kroj->name = $request->name;
        $kroj->save();

        rename(public_path('images/creator/' . $oldName . '.png'), public_path('images/creator/' . $request->name . '.png'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Kroj  $kroj
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $kroj = Kroj::find($request->id);
        $imgPath = '';        
        if ($kroj->female == 1) {
            $imgPath = "images/creator/female/";
        } else {
            $imgPath = "images/creator/";
        }
        if ($kroj != null) {
            $file_path = public_path($imgPath) . $kroj->name . '.png';
            if (file_exists($file_path)) {
                unlink($file_path);
            } 
            $kroj->delete();
        }        
    }
}
