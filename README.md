# firma-backend

A nodejs RESTful application for managing users, projects and working hours. Currently in norwegian.

Requires node-oracledb to be installed manually

## Installation
```
npm install
npm start
```

## Docker image

Build image manually
```
sudo docker build -t metrafonic/firma-backend .
```

## Running & Configuration
By default the app will run on port 3000.

DB settings MUST BE SET in /conf/config.js

Check current config in http://localhost:3000/api

## API usage
Up to date info can be found on http://localhost:3000/api

## DB Setup:
Requires a running oracle database.

SQL script for setting up db follows:
```
CREATE TABLE Ansatt
  (
    ansattnr  NUMBER (5) NOT NULL,
    fornavn   VARCHAR2 (20) NOT NULL,
    etternavn VARCHAR2 (20) NOT NULL,
    gateadr   VARCHAR2 (45) ,
    postnr    NUMBER (4),
    fodsdato  DATE ,
    tlf       VARCHAR2 (15) ,
    fax       VARCHAR2 (15) ,
    e_post    VARCHAR2 (40)
  ) ;
ALTER TABLE Ansatt ADD CONSTRAINT ikke_gyldig_epost
  CHECK (instr(e_post,'@')>0 AND instr(e_post,'.')>0) ;
ALTER TABLE Ansatt ADD CONSTRAINT Konsulenter_PK PRIMARY KEY ( ansattnr ) ;


CREATE TABLE Kunder
  (
    kunde_id      NUMBER (5) NOT NULL ,
    addresse      VARCHAR2 (45) ,
    telefonnummer VARCHAR2 (15) ,
    postnummer    NUMBER (4) NOT NULL ,
    kunde_navn    VARCHAR2 (50)
  ) ;
ALTER TABLE Kunder ADD CONSTRAINT Kunder_PK PRIMARY KEY ( kunde_id ) ;


CREATE TABLE Oppdrag
  (
    ansattnr     NUMBER (5) NOT NULL ,
    prosjektkode VARCHAR2 (10) NOT NULL ,
    fra_dag      DATE ,
    til_dag      DATE
  )
  LOGGING ;
ALTER TABLE Oppdrag ADD CONSTRAINT fra_etter_sluttdato
CHECK (fra_dag<til_dag) ;
ALTER TABLE Oppdrag ADD CONSTRAINT Oppdrag_PK
PRIMARY KEY ( ansattnr, prosjektkode ) ;


CREATE TABLE Poststed
  (
    postnr    NUMBER (4) NOT NULL ,
    stedsnavn VARCHAR2 (45)
  ) ;
ALTER TABLE Poststed ADD CONSTRAINT Poststed_PK PRIMARY KEY ( postnr ) ;


CREATE TABLE Prosjekt
  (
    prosjkode  VARCHAR2 (10) NOT NULL ,
    pnavn      VARCHAR2 (10) ,
    startdato  DATE ,
    ferdigdato DATE ,
    estimat    NUMBER (7) ,
    leder      NUMBER (5) NOT NULL ,
    kundenr    NUMBER (5) NOT NULL
  ) ;
ALTER TABLE Prosjekt ADD CONSTRAINT ferdigdato_forran_startdato
CHECK (ferdigdato>startdato) ;
ALTER TABLE Prosjekt ADD CONSTRAINT Prosjekter_PK
PRIMARY KEY ( prosjkode ) ;


CREATE TABLE Timer
  (
    ansattnr  NUMBER (5) NOT NULL ,
    prosjkode VARCHAR2 (10) NOT NULL ,
    timer     NUMBER (5) ,
    dato      DATE DEFAULT SYSDATE
  ) ;
ALTER TABLE Timer ADD CONSTRAINT timer_over_24h CHECK (timer<=24) ;
ALTER TABLE Timer ADD CONSTRAINT Arbeidsfordeling_PK
PRIMARY KEY ( ansattnr, prosjkode, dato ) ;


ALTER TABLE Timer ADD CONSTRAINT Arbeidsfordeling_Kons_FK
FOREIGN KEY ( ansattnr ) REFERENCES Ansatt ( ansattnr );

ALTER TABLE Timer ADD CONSTRAINT Arbeidsfordeling_Prosjekter_FK
FOREIGN KEY ( prosjkode ) REFERENCES Prosjekt ( prosjkode );

ALTER TABLE Ansatt ADD CONSTRAINT Konsulenter_Poststed_FK
FOREIGN KEY ( postnr ) REFERENCES Poststed ( postnr );

ALTER TABLE Kunder ADD CONSTRAINT Kunder_Poststed_FK
FOREIGN KEY ( postnummer ) REFERENCES Poststed ( postnr );

ALTER TABLE Oppdrag ADD CONSTRAINT Oppdrag_Ansatt_FK
FOREIGN KEY ( ansattnr ) REFERENCES Ansatt ( ansattnr );

ALTER TABLE Oppdrag ADD CONSTRAINT Oppdrag_Prosjekt_FK
FOREIGN KEY ( prosjektkode ) REFERENCES Prosjekt ( prosjkode );

ALTER TABLE Prosjekt ADD CONSTRAINT Prosjekter_Konsulenter_FK
FOREIGN KEY ( leder ) REFERENCES Ansatt ( ansattnr );

ALTER TABLE Prosjekt ADD CONSTRAINT Prosjekter_Kunder_FK
FOREIGN KEY ( kundenr ) REFERENCES Kunder ( kunde_id );

CREATE SEQUENCE sekv_asatt START WITH 1000 NOCACHE ORDER ;
CREATE OR REPLACE TRIGGER Ansatt_ansattnr_TRG BEFORE
  INSERT ON Ansatt FOR EACH ROW WHEN (NEW.ansattnr IS NULL)
  BEGIN :NEW.ansattnr := sekv_asatt.NEXTVAL;
END;
```
