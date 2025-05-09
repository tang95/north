import React from 'react';
import cppIcon from '../img/language/cpp.svg';
import dotnetIcon from '../img/language/dotnet.svg';
import erlangIcon from '../img/language/erlang.svg';
import goIcon from '../img/language/go.svg';
import javaIcon from '../img/language/java.svg';
import kotlinIcon from '../img/language/kotlin.svg';
import nodejsIcon from '../img/language/nodejs.svg';
import phpIcon from '../img/language/php.svg';
import pythonIcon from '../img/language/python.svg';
import rubyIcon from '../img/language/ruby.svg';
import rustIcon from '../img/language/rust.svg';
import swiftIcon from '../img/language/swift.svg';
import webjsIcon from '../img/language/webjs.svg';
import opentelemetryIcon from '../img/opentelemetry.svg';

export const ICON_SIZE = '32px';

export const languageIcons: { [key: string]: string } = {
    cpp: cppIcon,
    dotnet: dotnetIcon,
    erlang: erlangIcon,
    go: goIcon,
    kotlin: kotlinIcon,
    nodejs: nodejsIcon,
    php: phpIcon,
    python: pythonIcon,
    ruby: rubyIcon,
    rust: rustIcon,
    swift: swiftIcon,
    webjs: webjsIcon,
    java: javaIcon,
    unknown: opentelemetryIcon
};

export const getLanguageIcon = (language?: string) => {
    if (!language) {
        return <img src={opentelemetryIcon} alt="OpenTelemetry" style={{ width: ICON_SIZE, height: ICON_SIZE }} />;
    }

    const icon = languageIcons[language.toLowerCase()];
    return icon ? (
        <img src={icon} alt={language} style={{ width: ICON_SIZE, height: ICON_SIZE }} />
    ) : (
        <img src={opentelemetryIcon} alt="OpenTelemetry" style={{ width: ICON_SIZE, height: ICON_SIZE }} />
    );
};

export const getLanguageIconUrl = (language?: string): string => {
    if (!language) {
        return opentelemetryIcon;
    }
    const icon = languageIcons[language.toLowerCase()];
    return icon || opentelemetryIcon;
}; 
