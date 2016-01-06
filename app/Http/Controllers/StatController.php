<?php namespace App\Http\Controllers;
use Illuminate\Support\Facades\Input;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use DB;

class StatController extends Controller {
    /**
     * Store an image.
     *
     * @return simple JSON response message
     */
    public function getstat(Request $request)
    {
        $image_url = Input::get('image_url');
        $rows = DB::select('select * from ip_adresses_main where image_url = ?', [$image_url]);

        //echo $rows;
//        foreach ($rows as &$value) {
//            echo $value;
//        }
        return response()->json(['success' => true,'url_image'=>$image_url,'rows'=>$rows], 200);
    }
}