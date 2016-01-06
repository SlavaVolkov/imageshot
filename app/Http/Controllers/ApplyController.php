<?php namespace App\Http\Controllers;
use Illuminate\Support\Facades\Input;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;

class ApplyController extends Controller {
    /**
     * Store an image.
     *
     * @return simple JSON response message
     */
    public function store(Request $r)
    {
        $image = Input::file('file');
        $path = Input::file('file')->getFilename();
//        $validator = Validator::make([$image], ['image' => 'required']);
//        if ($validator->fails()) {
//            return $this->errors(['message' => 'Not an image.', 'code' => 400]);
//        }

        $destinationPath = public_path() . '\uploads';
        $extension = Input::file('file')->getClientOriginalExtension(); // getting image extension
        $fileName = rand(11111111,99999999).'.'.$extension; // renameing image
        $image_url = '\uploads\\'.$fileName;
        if(!$image->move($destinationPath, $fileName)) {
            return $this->errors(['message' => 'Error saving the file.', 'code' => 400]);
        }
        return response()->json(['success' => true,'url_image'=>$image_url], 200);
    }
}