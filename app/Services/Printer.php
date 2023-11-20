<?php

namespace App\Services;



class Printer
{
    public static function print()
    {
        // Your content to be printed
        $content = "Hello, this is the content to be printed.";

        // Create a temporary file
        $filename = tempnam(sys_get_temp_dir(), 'print_');
        file_put_contents($filename, $content);

        // Print the file using the lpr command
        $printerCommand = "lpr -P http://192.168.100.37:3911 $filename";
        exec($printerCommand, $output, $returnCode);

        // Check if the print command was successful
        if ($returnCode === 0) {
            echo "Printing completed.";
        } else {
            echo "Failed to print. Check your printer name and permissions. " . $returnCode;
        }

        // Delete the temporary file
        unlink($filename);

        echo $printerCommand;
    }


}