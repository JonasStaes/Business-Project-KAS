package com.ap.kas.config;

public class Profiles {
    public static final String TEST = "test";
    public static final String DEMO = "demo";
    public static final String PRODUCTION = "production";

    public Profiles() {}

    public static String getTest() { return TEST; }

    public static String getDemo() { return DEMO; }

    public static String getProduction() { return PRODUCTION; }
}
