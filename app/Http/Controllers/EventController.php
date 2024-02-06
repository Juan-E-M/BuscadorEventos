<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Crl;
use App\Models\Trl;
use App\Models\Ocde;
use App\Models\Ods;
use App\Models\Country;
use App\Models\Event;
use Illuminate\Support\Facades\Storage;


class EventController extends Controller
{
    public function index()
    {
        $crlOptions = Crl::all();
        $trlOptions = Trl::all();
        $events = Event::with('ods', 'ocde', 'trl', 'crl', 'country')->get();
        $ocdes = Ocde::all();
        $odss = Ods::all();
        return Inertia::render('Events/Index', [
            'events' => $events,
            'crlOptions' => $crlOptions,
            'trlOptions' => $trlOptions,
            'ocdes' => $ocdes,
            'odss' => $odss,
        ]);
    }


    public function create()
    {
        $crlOptions = Crl::all();
        $trlOptions = Trl::all();
        $ocdes = Ocde::all();
        $odss = Ods::all();
        $countries = Country::all();
        return Inertia::render('Events/Create', [
            'crlOptions' => $crlOptions,
            'trlOptions' => $trlOptions,
            'ocdes' => $ocdes,
            'odss' => $odss,
            'countries' => $countries,
        ]);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'institution' => 'required',
            'name' => 'required',
            'summary' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
            'status' => 'required',
            'budget' => 'required',
            'link' => 'required|url',
            'others' => 'required',
            'country' => 'required',
            'region' => 'required',
            'crl' => 'required',
            'publication'=> 'required',
            'trl' => 'required',
            'ods' => 'required|array',
            'ocde' => 'required|array',
            'file' => 'file|mimes:pdf,doc,docx',
        ]);
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $filePath = $file->storeAs('uploads', $fileName, 'public');
            $data['file_path'] = $filePath;
        }
        $event = Event::create($data);
        $event->country()->associate($request->input('country'));
        $event->trl()->associate($request->input('trl'));
        $event->crl()->associate($request->input('crl'));
        $event->save();
        if ($request->has('ods')) {
            $event->ods()->attach($request->input('ods'));
        }
        if ($request->has('ocde')) {
            $event->ocde()->attach($request->input('ocde'));
        }
        return redirect()->back();
    }
    private function getFileLink($filePath)
    {
        return asset(Storage::url($filePath));
    }

    public function show($id)
    {
        $event = Event::with('ods', 'ocde', 'crl', 'trl', 'country')->find($id);
        if (!$event) {
            return response()->json(['message' => 'registro no encontrado'], 404);
        }
        $fileLink = $this->getFileLink($event->file_path);
        $event->file_path = $fileLink;
        return Inertia::render('Events/Show', [
            'event' => $event,
        ]);
    }


    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }


    public function destroy($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json(['message' => 'Registro no encontrado'], 404);
        }
        if ($event->file_path) {
            Storage::disk('public')->delete($event->file_path);
        }
        $event->delete();
        return Inertia::location(route('events.index'));
    }
}
