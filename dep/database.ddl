BEGIN
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
END;
