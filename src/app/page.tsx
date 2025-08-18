"use client";

import { useEffect, useState } from "react";
import { Copy, Code, Globe, MapPin } from "lucide-react";
import { motion } from "framer-motion";

// Define types for the JSON structure
interface WardData {
  [ward: string]: string[];
}

interface ConstituencyData {
  [constituency: string]: WardData;
}

interface AreaData {
  [county: string]: ConstituencyData;
}

export default function HomePage() {
  const [areas, setAreas] = useState<AreaData>({});
  const [counties, setCounties] = useState<string[]>([]);
  const [constituencies, setConstituencies] = useState<string[]>([]);
  const [wards, setWards] = useState<string[]>([]);
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("JavaScript");

  // Public API key
  const PUBLIC_API_KEY = "keyPub1569gsvndc123kg9sjhg";

  // Languages for examples
  const languages = [
    "JavaScript",
    "Node.js",
    "TypeScript",
    "Python",
    "PHP",
    "Java",
    "C#",
    "C++",
    "Ruby",
  ];

  // Load JSON from public/data/areas.json
  useEffect(() => {
    fetch("/data/areas.json")
      .then((res) => res.json())
      .then((data: AreaData) => {
        setAreas(data);
        setCounties(Object.keys(data));
      });
  }, []);

  // Handle county selection
  useEffect(() => {
    if (selectedCounty && areas[selectedCounty]) {
      const constituencyList = Object.keys(areas[selectedCounty]);
      setConstituencies(constituencyList);
      setSelectedConstituency("");
      setWards([]);
    } else {
      setConstituencies([]);
      setWards([]);
    }
  }, [selectedCounty, areas]);

  // Handle constituency selection
  useEffect(() => {
    if (selectedConstituency && areas[selectedCounty]?.[selectedConstituency]) {
      const wardList = areas[selectedCounty][selectedConstituency];
      setWards(Array.isArray(wardList) ? wardList : Object.keys(wardList));
    } else {
      setWards([]);
    }
  }, [selectedConstituency, selectedCounty, areas]);

  // Copy API key
  const handleCopy = () => {
    navigator.clipboard.writeText(PUBLIC_API_KEY);
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  // Get code snippet based on selected language
  const getCodeSnippet = () => {
    const baseUrl = "https://kenyaareadata.vercel.app/api/areas";
    switch (selectedLanguage) {
      case "JavaScript":
        return `fetch('${baseUrl}?apiKey=${PUBLIC_API_KEY}&county=Mombasa')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
      case "Node.js":
        return `const https = require('https');

https.get('${baseUrl}?apiKey=${PUBLIC_API_KEY}&county=Mombasa', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(JSON.parse(data));
  });
}).on('error', (err) => {
  console.error('Error:', err);
});`;
      case "TypeScript":
        return `interface ResponseData { [key: string]: any; }

fetch('${baseUrl}?apiKey=${PUBLIC_API_KEY}&county=Mombasa')
  .then(response => response.json() as Promise<ResponseData>)
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;
      case "Python":
        return `import requests

url = "${baseUrl}?apiKey=${PUBLIC_API_KEY}&county=Mombasa"
response = requests.get(url)
if response.status_code == 200:
    print(response.json())
else:
    print(f"Error: {response.status_code}")`;
      case "PHP":
        return `<?php
$url = "${baseUrl}?apiKey=${PUBLIC_API_KEY}&county=Mombasa";
$response = file_get_contents($url);
$data = json_decode($response, true);
print_r($data);
?>`;
      case "Java":
        return `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("${baseUrl}?apiKey=${PUBLIC_API_KEY}&county=Mombasa"))
                .GET()
                .build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
    }
}`;
      case "C#":
        return `using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program {
    static async Task Main() {
        using HttpClient client = new HttpClient();
        string url = "${baseUrl}?apiKey=${PUBLIC_API_KEY}&county=Mombasa";
        HttpResponseMessage response = await client.GetAsync(url);
        if (response.IsSuccessStatusCode) {
            string content = await response.Content.ReadAsStringAsync();
            Console.WriteLine(content);
        } else {
            Console.WriteLine($"Error: {response.StatusCode}");
        }
    }
}`;
      case "C++":
        return `#include <iostream>
#include <string>
#include <curl/curl.h>

size_t WriteCallback(void* contents, size_t size, size_t nmemb, void* userp) {
    ((std::string*)userp)->append((char*)contents, size * nmemb);
    return size * nmemb;
}

int main() {
    CURL* curl;
    CURLcode res;
    std::string readBuffer;
    curl = curl_easy_init();
    if(curl) {
        std::string url = "${baseUrl}?apiKey=${PUBLIC_API_KEY}&county=Mombasa";
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);
        res = curl_easy_perform(curl);
        curl_easy_cleanup(curl);
        std::cout << readBuffer << std::endl;
    }
    return 0;
}`;
      case "Ruby":
        return `require 'net/http'
require 'json'

uri = URI("${baseUrl}?apiKey=${PUBLIC_API_KEY}&county=Mombasa")
response = Net::HTTP.get(uri)
data = JSON.parse(response)
puts data`;
      default:
        return "";
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans text-sm leading-relaxed overflow-x-hidden">
      {/* Hero Section - Modern, minimal with subtle gradient */}
      <section className="text-center py-12 md:py-20 px-4 bg-gradient-to-br from-indigo-50 to-blue-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-2xl md:text-4xl font-extrabold mb-3 text-indigo-900">
            Kenya Area Data API
          </h1>
          <p className="max-w-xl mx-auto mb-6 text-gray-600 text-sm md:text-base">
            Structured access to Kenyas counties, constituencies, and wards. Developer-friendly, reliable, and free to use.
          </p>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition duration-300 text-xs font-medium"
            >
              <Copy className="w-4 h-4" />
              {apiKeyCopied ? "Copied!" : "Copy Public API Key"}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Try It Out Section - Interactive explorer with icons */}
      <section className="max-w-5xl mx-auto py-10 md:py-16 px-4 sm:px-6">
        <motion.h2
          className="text-lg md:text-xl font-bold text-center mb-6 md:mb-8 text-indigo-800 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Globe className="w-5 h-5" />
          Explore the Data
        </motion.h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {/* County Dropdown */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-indigo-600" />
              County
            </label>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none transition"
            >
              <option value="">Select County</option>
              {counties.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>

          {/* Constituency Dropdown */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-indigo-600" />
              Constituency
            </label>
            <select
              value={selectedConstituency}
              onChange={(e) => setSelectedConstituency(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none transition"
              disabled={!selectedCounty}
            >
              <option value="">Select Constituency</option>
              {constituencies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Ward Dropdown */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-indigo-600" />
              Ward
            </label>
            <select
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none transition"
              disabled={!selectedConstituency}
            >
              <option value="">Select Ward</option>
              {wards.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Documentation Section - Tabbed examples, clean layout like Daraja */}
      <section className="bg-gray-50 py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-lg md:text-xl font-bold text-center mb-6 md:mb-8 text-indigo-800 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Code className="w-5 h-5" />
            API Documentation
          </motion.h2>
          <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-4 md:p-6 text-sm">
            <h3 className="text-md md:text-lg font-semibold mb-3 md:mb-4 text-gray-800">Overview</h3>
            <p className="mb-4 text-gray-600 text-xs md:text-sm">
              Access Kenyas administrative areas with a simple REST API. Use the public key <code className="bg-gray-100 px-1 rounded">{PUBLIC_API_KEY}</code> for all requests.
            </p>
            <h4 className="text-sm md:text-md font-semibold mb-2 text-gray-800">Base URL</h4>
            <pre className="bg-gray-900 text-green-300 rounded-lg p-3 overflow-x-auto mb-4 text-xs">
              https://kenyaareadata.vercel.app/api/areas
            </pre>
            <h4 className="text-sm md:text-md font-semibold mb-2 text-gray-800">Authentication</h4>
            <p className="mb-4 text-gray-600 text-xs md:text-sm">
              Add <code className="bg-gray-100 px-1 rounded">?apiKey={PUBLIC_API_KEY}</code> to your queries.
            </p>
            <h4 className="text-sm md:text-md font-semibold mb-2 text-gray-800">Endpoints</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-600 text-xs md:text-sm space-y-2">
              <li className="break-words">
                <strong>All areas:</strong> <code className="bg-gray-100 px-1 rounded break-all">GET /api/areas?apiKey={PUBLIC_API_KEY}</code>
                <p className="ml-0 text-xs">Full dataset.</p>
              </li>
              <li className="break-words">
                <strong>By county:</strong> <code className="bg-gray-100 px-1 rounded break-all">GET /api/areas?apiKey={PUBLIC_API_KEY}&county=Mombasa</code>
                <p className="ml-0 text-xs">Constituencies and wards for a county.</p>
              </li>
              <li className="break-words">
                <strong>By constituency:</strong> <code className="bg-gray-100 px-1 rounded break-all">GET /api/areas?apiKey={PUBLIC_API_KEY}&county=Mombasa&constituency=Changamwe</code>
                <p className="ml-0 text-xs">Wards for a specific constituency.</p>
              </li>
            </ul>
            <h4 className="text-sm md:text-md font-semibold mb-3 text-gray-800">Example Requests</h4>
            <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto py-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition whitespace-nowrap ${
                    selectedLanguage === lang
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <pre className="bg-gray-900 text-green-300 rounded-lg p-3 overflow-x-auto mb-4 text-xs">
              {getCodeSnippet()}
            </pre>
            <h4 className="text-sm md:text-md font-semibold mb-2 text-gray-800">Response Format</h4>
            <pre className="bg-gray-900 text-green-300 rounded-lg p-3 overflow-x-auto mb-4 text-xs">
{`{
  "Mombasa": {
    "Changamwe": ["Port Reitz", "Kipevu", "Airport", "Changamwe", "Chaani"],
    "Jomvu": ["Jomvu Kuu", "Miritini", "Mikindani"],
    ...
  }
}`}
            </pre>
            <h4 className="text-sm md:text-md font-semibold mb-2 text-gray-800">Error Responses</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-600 text-xs space-y-2">
              <li>
                <strong>401 Unauthorized:</strong> Invalid API key.
                <pre className="bg-gray-900 text-green-300 rounded-lg p-3 overflow-x-auto mt-1">
                  {`{"error": "Invalid API key"}`}
                </pre>
              </li>
              <li>
                <strong>404 Not Found:</strong> County or constituency not found.
                <pre className="bg-gray-900 text-green-300 rounded-lg p-3 overflow-x-auto mt-1">
                  {`{"error": "County not found"}`}
                </pre>
              </li>
              <li>
                <strong>400 Bad Request:</strong> Invalid query parameters.
                <pre className="bg-gray-900 text-green-300 rounded-lg p-3 overflow-x-auto mt-1">
                  {`{"error": "Invalid query parameters"}`}
                </pre>
              </li>
            </ul>
            <h4 className="text-sm md:text-md font-semibold mb-2 text-gray-800">Rate Limits</h4>
            <p className="mb-4 text-gray-600 text-xs md:text-sm">
              Free access with fair usage. Avoid excessive requests.
            </p>
            <h4 className="text-sm md:text-md font-semibold mb-2 text-gray-800">Interactive Demo</h4>
            <p className="text-gray-600 text-xs md:text-sm">
              Use the explorer above to see live data from the API.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}