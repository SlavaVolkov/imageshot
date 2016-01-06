<?php

Route::get('/', function () {
    return view('index');
});

Route::group(['prefix' => 'api'], function()
{
    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    Route::post('authenticate', 'AuthenticateController@authenticate');
    Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
    Route::get('upload', function() {
        return View::make('pages.upload');
    });
    Route::post('apply/upload', 'ApplyController@store');
    Route::post('getstat', 'StatController@getstat');
});

