<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInited859346da9590aa1451b10406bb166d
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInited859346da9590aa1451b10406bb166d::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInited859346da9590aa1451b10406bb166d::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}